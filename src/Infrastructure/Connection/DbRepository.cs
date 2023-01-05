using Infrastructure.Enums;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;

namespace Infrastructure.Connection
{
    public abstract class DbRepository
    {
        public SqlConnection sqlConnection;
        public bool outParameter = false;
        protected SqlCommand DbCommand(SqlConnection connection, object newObj, string strProcedure)
        {
            SqlCommand _command = new SqlCommand(strProcedure, connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            ////List<PropertyInfo> source = (from x in newObj.GetType().GetProperties()
            ////                             where CheckFields(x, newObj)
            ////                             select x).ToList();
            List<PropertyInfo> source = newObj.GetType().GetProperties().ToList();
            SqlCommandBuilder.DeriveParameters(_command);
            int i;
            for (i = 0; i < _command.Parameters.Count; i++)
            {
                PropertyInfo propertyInfo = source.FirstOrDefault((PropertyInfo x) => "@" + x.Name == _command.Parameters[i].ParameterName);
                if (!(propertyInfo != null))
                {
                    continue;
                }

                Type type = Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType;
                if (_command.Parameters[i].Direction == ParameterDirection.Input)
                {
                    object obj = Convert.ChangeType(propertyInfo.GetValue(newObj), type);
                    try
                    {
                        // object rawConstantValue = type.GetField("MinValue")!.GetRawConstantValue();
                        _command.Parameters[i].Value = obj ?? DBNull.Value;
                    }
                    catch(Exception ex)
                    {
                        throw ex;
                    }
                }
            }

            return _command;
        }

        private T CreateObject<T>(DataRow row)
        {
            object obj = Activator.CreateInstance(typeof(T));
            List<PropertyInfo> source = obj.GetType().GetProperties().ToList();
            foreach (DataColumn colomun in row.Table.Columns)
            {
                if (row[colomun.ColumnName] != DBNull.Value)
                {
                    object value = row[colomun.ColumnName];
                    PropertyInfo propertyInfo = source.FirstOrDefault((PropertyInfo p) => p.Name == colomun.ColumnName);
                    if (propertyInfo != null)
                    {
                        propertyInfo.SetValue(obj, Convert.ChangeType(value, Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType));
                    }
                }
            }

            return (T)obj;
        }

        private bool CheckFields(PropertyInfo info, object objSerch)
        {
            Type type = Nullable.GetUnderlyingType(info.PropertyType) ?? info.PropertyType;
            object value = info.GetValue(objSerch);
            if (value == null)
            {
                return false;
            }

            object obj = Convert.ChangeType(value, type);
            try
            {
                if (type.GetField("MinValue")!.GetRawConstantValue()!.ToString()!.Equals(obj.ToString()))
                {
                    return false;
                }

                return true;
            }
            catch
            {
                if (obj != null)
                {
                    return true;
                }
            }

            return false;
        }

        private List<SqlParameter> ParametersOutput(SqlParameterCollection sqlParameterCollection)
        {
            SqlParameter[] source = (from SqlParameter x in sqlParameterCollection
                                     where x.Direction.Equals(ParameterDirection.InputOutput) || x.Direction.Equals(ParameterDirection.Output)
                                     select x).ToArray();
            source.ToList().ForEach(delegate (SqlParameter x)
            {
                x.Direction = ParameterDirection.Output;
            });
            return source.ToList();
        }

        private Tuple<DataTable> SearchDB<T>(object objSerch, string strProcedure, QueryType querytype) where T : class, new()
        {
            object obj = new T();
            outParameter = false;
            string cmdText = ((querytype == QueryType.View) ? ("Select * FROM " + strProcedure + " ORDER BY 1 DESC;") : string.Empty);
            DataSet dataSet = new DataSet();
            try
            {
                SqlCommand _command = (querytype.Equals(QueryType.Procedure) ? new SqlCommand(strProcedure, sqlConnection)
                {
                    CommandType = CommandType.StoredProcedure
                } : new SqlCommand(cmdText, sqlConnection)
                {
                    CommandType = CommandType.Text
                });
                try
                {
                    if (querytype.Equals(QueryType.Procedure) && objSerch != null)
                    {
                        SqlCommandBuilder.DeriveParameters(_command);
                        //List<PropertyInfo> lstEntities = (from x in objSerch.GetType().GetProperties()
                        //                                  where CheckFields(x, objSerch)
                        //                                  select x).ToList();
                        List<PropertyInfo> lstEntities = objSerch.GetType().GetProperties().ToList();
                        SqlParameter[] array = (from SqlParameter x in _command.Parameters
                                                where lstEntities.Any((PropertyInfo y) => ("@" + y.Name).Contains(x.ParameterName)) && x.Direction.Equals(ParameterDirection.Input)
                                                select x).ToArray();
                        SqlParameter[] array2 = ParametersOutput(_command.Parameters).ToArray();
                        _command.Parameters.Clear();
                        if (array.Any())
                        {
                            _command.Parameters.AddRange(array);
                        }

                        if (array2.Any())
                        {
                            _command.Parameters.AddRange(array2);
                            outParameter = true;
                        }

                        int i;
                        for (i = 0; i < _command.Parameters.Count; i++)
                        {
                            PropertyInfo propertyInfo = lstEntities.FirstOrDefault((PropertyInfo x) => _command.Parameters[i].ParameterName.Equals("@" + x.Name));
                            if (propertyInfo != null)
                            {
                                Type conversionType = Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType;
                                if (_command.Parameters[i].Direction == ParameterDirection.Input)
                                {
                                    _command.Parameters[i].Value = Convert.ChangeType(propertyInfo.GetValue(objSerch), conversionType) ?? DBNull.Value;
                                }
                            }
                        }
                    }

                    SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(_command);
                    try
                    {
                        SqlCommandBuilder sqlCommandBuilder = new SqlCommandBuilder(sqlDataAdapter);
                        try
                        {
                            sqlDataAdapter.Fill(dataSet);
                            if (outParameter)
                            {
                                List<SqlParameter> sqlParameters = ParametersOutput(_command.Parameters);
                                obj = OutputParameter<T>(sqlParameters);
                            }
                        }
                        finally
                        {
                            ((IDisposable)(object)sqlCommandBuilder)?.Dispose();
                        }
                    }
                    finally
                    {
                        ((IDisposable)(object)sqlDataAdapter)?.Dispose();
                    }
                }
                finally
                {
                    if (_command != null)
                    {
                        ((IDisposable)_command).Dispose();
                    }
                }

                return Tuple.Create(dataSet.Tables?[0]);
            }
            finally
            {
                ((IDisposable)dataSet)?.Dispose();
            }
        }

        private T2 OutputParameter<T2>(List<SqlParameter> sqlParameters)
        {
            object obj = Activator.CreateInstance(typeof(T2));
            foreach (PropertyInfo item in typeof(T2).GetProperties().ToList())
            {
                object obj2 = sqlParameters.FirstOrDefault((SqlParameter x) => x.ParameterName.Equals("@" + item.Name))?.Value;
                if (obj2 != null)
                {
                    item.SetValue(obj, Convert.ChangeType(obj2, Nullable.GetUnderlyingType(item.PropertyType) ?? item.PropertyType));
                }
            }

            return (T2)obj;
        }



        internal List<T> SearchList<T>(object objSerch, string strProcedure, QueryType queryType = QueryType.Procedure)
            where T : class, new()
        {
            Tuple<DataTable> tuple = SearchDB<T>(objSerch, strProcedure, queryType);
            DataTable item = tuple.Item1;
            try
            {
                List<T> list = new List<T>();
                foreach (DataRow row in item.Rows)
                {
                    list.Add(CreateObject<T>(row));
                }

                return list.Any() ? list : new List<T>();
            }
            finally
            {
                ((IDisposable)item)?.Dispose();
            }
        }

        internal void SaveBulkCopy(DataTable newObj)
        {
            using SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(sqlConnection);
            sqlBulkCopy.DestinationTableName = "dbo." + newObj.TableName;
            sqlBulkCopy.WriteToServer(newObj);
        }

        internal int SaveObject(DataTable newObj, string strProcedure)
        {
            using SqlCommand sqlCommand = new SqlCommand(strProcedure, sqlConnection)
            {
                CommandType = CommandType.StoredProcedure
            };
            SqlCommandBuilder.DeriveParameters(sqlCommand);
            sqlCommand.Parameters["@" + newObj.TableName].Value = newObj;
            sqlCommand.Parameters.Cast<SqlParameter>().ToList().ForEach(delegate (SqlParameter x)
            {
                x.Direction = (x.Direction.Equals(ParameterDirection.InputOutput) ? ParameterDirection.Output : x.Direction);
            });
            return sqlCommand.ExecuteNonQuery();
        }

        internal int SaveObject(object newObj, string strProcedure)
        {
            using SqlCommand sqlCommand = DbCommand(sqlConnection, newObj, strProcedure);
            sqlCommand.Parameters.Cast<SqlParameter>().ToList().ForEach(delegate (SqlParameter x)
            {
                x.Direction = (x.Direction.Equals(ParameterDirection.InputOutput) ? ParameterDirection.Output : x.Direction);
            });
            return sqlCommand.ExecuteNonQuery();
        }

        internal T2 SaveObject<T2>(object newObj, string strProcedure)
        {

            using SqlCommand sqlCommand = DbCommand(sqlConnection, newObj, strProcedure);
            sqlCommand.Parameters.Cast<SqlParameter>().ToList().ForEach(delegate (SqlParameter x)
            {
                x.Direction = (x.Direction.Equals(ParameterDirection.InputOutput) ? ParameterDirection.Output : x.Direction);
            });
            sqlCommand.ExecuteNonQuery();
            List<SqlParameter> sqlParameters = ParametersOutput(sqlCommand.Parameters);
            return OutputParameter<T2>(sqlParameters);
        }
    }
}

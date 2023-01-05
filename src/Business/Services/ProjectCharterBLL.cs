using Business.Repositories;
using Domain.DTOs;
using Domain.Entities;
using Domain.Util;


namespace Business.Services
{
    public class ProjectCharterBLL 
    {

        public List<ProjectCharter> GetAll()
        {
            try {
                using (var repo = new GenericDal()) 
                return repo.GetAll<ProjectCharter>(); }
            catch { return null; }
        }
        public async Task<List<ProjectCharter>> GetAvaiables()
        {
            using (var repo = new GenericDal())
            return await repo.GetListAsync<ProjectCharter>(new { IsActive = true });
        }
        public async Task<Output> Create(ProjectCharterDTO projectcharterdto)
        {
            try
            {
                ProjectCharter objprojectcharter = new ProjectCharter(projectcharterdto);
                if (projectcharterdto.IdProject <= 0 || projectcharterdto.IdDetailsProject < 0 || projectcharterdto.ProjectRequeriment == null
                     || projectcharterdto.IsActive == null || projectcharterdto.Members == null) return new Output { Code = 1, Message = "Parameters are not defined" };

                // genericDal.Search(objprojectcharter.IdProject);
                Output output = null;
                using (var repo = new GenericDal())
                        output = await repo.Post<Output>(objprojectcharter);
                int? idcharter = output.outputinsert;

                if (output.Code > 0)
                {
                    return new Output { Code = 1, Message = "insert failed" };
                }


                return new Output { Code = 0, Message = "Success", outputinsert = idcharter }; ;


            }
            catch (Exception ex)
            {

                return new Output { Code = 1, Message = ex.Message }; ;
            }


        }

        public Output Update(ProjectCharterDTO projectcharterdto)
        {
            try
            {
                ProjectCharter objprojectcharter = new ProjectCharter(projectcharterdto);
                if (objprojectcharter.IdProject <= 0 || objprojectcharter.IdDetailsProject <= 0 || objprojectcharter.ProjectRequeriment == null
                     || objprojectcharter.IsActive == null || objprojectcharter.Members == null)
                    return new Output { Code = 1, Message = "Parameters are not defined" };
                using (var repo = new GenericDal())
                {
                    var output = repo.Update<Output>(objprojectcharter);
                    if (output == null)
                    {
                        return new Output { Code = 1, Message = "Data not found" };
                    }
                    return output;
                }

            }
            catch (Exception ex)
            {

                return new Output
                {
                    Code = 1,
                    Message = ex.Message
                }; ;
            }

        }
        public ProjectCharter GetCharterId(int Id)
        {
            try
            {
                using (var repo = new GenericDal())
                    return repo.GetByid<ProjectCharter>(new { Id, IsActive = true }, "spSelect_CharterIdByProject");
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public ProjectCharter GetByIdProjectCharter(int Id)
        {
            try
            {
                using (var repo = new GenericDal())
                    return repo.GetByid<ProjectCharter>(new { Id }, "spSelect_Project");

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public Output Delete(int id)
        {
            try {
                using (var repo = new GenericDal())
                    return repo.Update<Output>(new { Id = id }, "spDelete_ProjectCharter"); }
            catch { return null; }
        }
    }
}

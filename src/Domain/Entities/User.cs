namespace Domain.Entities
{
    public class User
    {
        #region Properties
        /// <summary>
        /// get or set value of: Id
        /// </summary>
        public int? Id { get; set; } = int.MinValue;

        /// <summary>
        /// get or set value of: UserName
        /// </summary>
        public string? UserName { get; set; } = null;

        /// <summary>
        /// get or set value of: FullName
        /// </summary>
        public string? FullName { get; set; } = null;

        /// <summary>
        /// get or set value of: ProfileId
        /// </summary>
        public object? ProfileId { get; set; } = null;
        /// <summary>
        /// get or set value of: ProfileName
        /// </summary>
        public string? ProfileName { get; set; } = null;
        /// <summary>
        /// get or set value of: ClientId
        /// </summary>
        public object? ClientId { get; set; } = null;
        /// <summary>
        /// get or set value of: ClientName 
        /// </summary>
        public string? ClientName { get; set; } = null;
        /// <summary>
        /// get or set value of: Permissions
        /// </summary>
        public string? Permissions { get; set; } = null;

        /// <summary>
        /// get or set value of: IsActive
        /// </summary>
        public bool? IsActive { get; set; } = true;

        /// <summary>
        /// get or set value of: Created
        /// </summary>
        public DateTime? Created { get; set; } = DateTime.MinValue;
        /// <summary>
        /// get or set value of: IdLOB
        /// </summary>
        public int IdLOB { get; set; } = int.MinValue;
        #endregion
    }
}

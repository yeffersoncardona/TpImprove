namespace Domain.DTOs
{
    public class ProjectDTO
    {
        /// <summary>
        /// get or set value of: IdProject
        /// </summary>
        public int IdProject { get; set; }
        /// <summary>
        /// get or set value of: ProjectName
        /// </summary>
        public string? ProjectName { get; set; }
        /// <summary>
        /// get or set value of: Description
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// get or set value of: IdProjectState
        /// </summary>
        public int IdProjectState { get; set; }
        /// <summary>
        /// get or set value of: IdLob
        /// </summary>
        public int IdLob { get; set; }
        /// <summary>
        /// get or set value of: IdUser
        /// </summary>
        public int IdUser { get; set; }
        /// <summary>
        /// get or set value of: Market
        /// </summary>
        public int IdClient { get; set; }
        public string ClientName { get; set; }
        public string MarketName { get; set; }
        public string Lob { get; set; }
    }
}

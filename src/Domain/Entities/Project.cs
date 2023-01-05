using Domain.DTOs;

namespace Domain.Entities
{
    public class Project
    {
        public Project(ProjectDTO projectdto)
        {
            IdProject = projectdto.IdProject;
            ProjectName = projectdto.ProjectName;
            Description = projectdto.Description;
            IdProjectState = projectdto.IdProjectState;
            IdLob = projectdto.IdLob;
            IdUser = projectdto.IdUser;
            IsActive = true;
            CreateDate = DateTime.Now;
        }
        public Project()
        {

        }

        /// <summary>
        /// get or set value of: IdProject
        /// </summary>
        public int IdProject { get; set; } = int.MinValue;
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
        public int IdProjectState { get; set; } = int.MinValue;
        /// <summary>
        /// get or set value of: IdLob
        /// </summary>
        public int IdLob { get; set; } = int.MinValue;
        /// <summary>
        /// get or set value of: IdUser
        /// </summary>
        public int IdUser { get; set; } = int.MinValue;
        /// <summary>
        /// get or set value of: IsActive
        /// </summary>
        public bool? IsActive { get; set; } = true;
        /// <summary>
        ///  get or set value of: CreateDate
        /// </summary>
        public DateTime? CreateDate { get; set; } = DateTime.Now;
        /// <summary>
        /// get or set value of: IdDataquery
        /// </summary>
        public int IdDataquery { get; set; } = int.MinValue;
    }
}

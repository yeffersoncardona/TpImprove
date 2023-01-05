using System;

namespace Domain.Entities
{
    public class Profile
    {
        #region Properties
        /// <summary>
        /// get or set value of: Id
        /// </summary>
        public int? Id { get; set; } = int.MinValue;

        /// <summary>
        /// get or set value of: Name
        /// </summary>
        public string? Name { get; set; } = null;

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
        public DateTime? Created { get; set; } = null;

        #endregion
    }
}

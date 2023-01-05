namespace Domain.Entities
{
    public class ProblemReasonsDetail
    {
        /// <summary>
        /// get or set value of:IDProblemReasons
        /// </summary>
        public int IDProblemReasons { get; set; } = int.MinValue;
        /// <summary>
        /// get or set value of:Why
        /// </summary>
        public string? Why { get; set; } = null;
        /// <summary>
        /// get or set value of:IdSourceProblem
        /// </summary>
        public int? IdSourceProblem { get; set; } = int.MinValue;
        /// <summary>
        /// get or set value of:IdFather
        /// </summary>
        public int? IdFather { get; set; } = int.MinValue;
        /// <summary>
        /// get or set value of: CreateDate
        /// </summary>
        public DateTime CreateDate { get; set; } = DateTime.MinValue;
        /// <summary>
        /// get or set value of: IsActive
        /// </summary>
        public bool? IsActive { get; set; } = true;
    }
}

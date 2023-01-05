namespace Domain.DataQuerys
{
    public class DataQuerys
    {
        public int Id { get; set; } = int.MinValue;
        /// <summary>
        ///  get or set value of: TargetKpi value
        /// </summary>
        public string UserName { get; set; } = string.Empty;
        /// <summary>
        ///  get or set value of: TargetKpi value
        /// </summary>
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        /// <summary>
        ///  get or set value of: TargetKpi value
        /// </summary>
        public DateTime EndDate { get; set; }= DateTime.MinValue;
        /// <summary>
        ///  get or set value of: TargetKpi value
        /// </summary>
        public double Sigma { get; set; } = Double.MinValue;
        /// <summary>
        ///  get or set value of: TargetKpi value
        /// </summary>
        public double CoefficientVariation { get; set; } = Double.MinValue;
        /// <summary>
        ///  get or set value of: TargetKpi value
        /// </summary>
        public string TargetKpi { get; set; }= string.Empty;
    }
}

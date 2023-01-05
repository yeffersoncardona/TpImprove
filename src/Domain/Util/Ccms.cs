namespace Domain.Util
{
    public class Ccms
    {
        public Error? error { get; set; }
        public Result? result { get; set; }
    }

    public class Error
    {
        public string? codError { get; set; }
        public string? messageError { get; set; }
        public string? secuencia { get; set; }
    }

    public class Result
    {
        public string? token { get; set; }
    }
}

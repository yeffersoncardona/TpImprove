
namespace Domain.Entities;

public class SourceProblemEntity
{
    /// <summary>
    /// get or set value of: IDSproblem
    /// </summary>
    public int IDSproblem { get; set; } = int.MinValue;
    /// <summary>
    /// get or set value of: ProblemDetail
    /// 
    /// </summary>
    public string? ProblemDetail { get; set; } = null;
    /// <summary>
    /// get or set value of: IdProject
    /// 
    /// </summary>
    public int IdProject { get; set; } = int.MinValue;
    /// <summary>
    /// get or set value of: Result
    /// </summary>
    public string? Result { get; set; } = null;
    /// <summary>
    /// get or set value of: CreateDate
    /// </summary>
    public DateTime CreateDate { get; set; } = DateTime.MinValue;
    /// <summary>
    /// get or set value of: IsActive
    /// </summary>
    public bool? IsActive { get; set; } = true;
}

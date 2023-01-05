namespace Domain.Entities;

public class Client
{

    #region Properties
    /// <summary>
    /// get or set value of: Id
    /// </summary>
    public int? Id { get; set; } = int.MinValue;
    /// <summary>
    /// get or set value of: Name
    /// </summary>
    public string Name { get; set; } 
    /// <summary>
    /// get or set value of: IsActive
    /// </summary>
    public bool? IsActive { get; set; } = true;
    /// <summary>
    /// get or set value of: Created
    /// </summary>
    public DateTime? Created { get; set; } = DateTime.MinValue;
    /// <summary>
    /// get or set value of: Market
    /// </summary>
    public string? Market { get; set; } = null;
    #endregion
}


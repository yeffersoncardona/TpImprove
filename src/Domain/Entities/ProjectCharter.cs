using Domain.DTOs;

namespace Domain.Entities;

public class ProjectCharter
{
    public ProjectCharter(ProjectCharterDTO projectcharterdto)
    {

        IdDetailsProject = projectcharterdto.IdDetailsProject;
        ProblemStatus = projectcharterdto.ProblemStatus;
        Members = projectcharterdto.Members;
        Reach = projectcharterdto.Reach;
        OutReach = projectcharterdto.OutReach;
        Goals = projectcharterdto.Goals;
        Proposal = projectcharterdto.Proposal;
        IdProject = projectcharterdto.IdProject;
        CreateDate = projectcharterdto.CreateDate;
        IsActive = projectcharterdto.IsActive;
        ProjectRequeriment = projectcharterdto.ProjectRequeriment;
    }
    public ProjectCharter()
    {

    }
    /// <summary>
    /// get or set value of: IdDetailsProject
    /// </summary>
    public int IdDetailsProject { get; set; } = int.MinValue;
    /// <summary>
    /// get or set value of: ProjectRequeriment
    /// </summary>
    public string? ProjectRequeriment { get; set; } = null;
    /// <summary>
    /// get or set value of: Members
    /// </summary>
    public string? Members { get; set; } = null;
    /// <summary>
    /// get or set value of: Reach
    /// </summary>
    public string? Reach { get; set; } = null;
    /// <summary>
    /// get or set value of: OutReach
    /// </summary>
    public string? OutReach { get; set; } = null;
    /// <summary>
    /// get or set value of: Goals
    /// </summary>
    public string? Goals { get; set; } = null;
    /// <summary>
    /// get or set value of: Proposal
    /// </summary>
    public string? Proposal { get; set; } = null;
    /// <summary>
    /// get or set value of: IdProject
    /// </summary>
    public int IdProject { get; set; } = int.MinValue;
    /// <summary>
    /// get or set value of: CreateDate
    /// </summary>
    public DateTime CreateDate { get; set; } = DateTime.MinValue;
    /// <summary>
    /// get or set value of: IsActive
    /// </summary>
    public bool? IsActive { get; set; } = true;
    /// <summary>
    /// get or set value of: ProblemStatus
    /// </summary>
    public string? ProblemStatus { get; set; } = null;

}

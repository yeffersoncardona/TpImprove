using Domain.DTOs;

namespace Domain.Entities
{
    public class SourceProblem: SourceProblemEntity
    {
        public SourceProblem(SourceProblemDTO sourceproblemdto)
        {
            IDSproblem = sourceproblemdto.IDSproblem;
            ProblemDetail = sourceproblemdto.ProblemDetail;
            IdProject = sourceproblemdto.IdProject;
            Result = sourceproblemdto.Result;
            CreateDate = sourceproblemdto.CreateDate;
            IsActive = sourceproblemdto.IsActive;
        }

    }
}

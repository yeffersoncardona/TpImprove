CREATE PROCEDURE [dbo].[spSelect_SourceProblem]
    @ID int = NULL,
    @ProblemDetail int = NULL,
    @IdProject  int = NULL,
    @Result varchar(255)=NULL,
    @IsActive bit =null,
    @CreateDate datetime=NULL
AS
SET NOCOUNT ON
	SELECT 
       [IDSproblem]
      ,[ProblemDetail]
      ,[IdProject]
      ,[Result]
      ,[IsActive]
      ,[CreateDate]
  FROM [Template].[dbo].[SourceProblem]
   WHERE
	(@Id IS NULL OR  [IDSproblem] = @Id) and
    (@ProblemDetail IS NULL OR  [ProblemDetail] = @ProblemDetail) and
    (@IdProject IS NULL OR  [IdProject] = @IdProject) and
    (@Result IS NULL OR  [Result] = @Result) and
    (@CreateDate IS NULL OR  [CreateDate] = @CreateDate)
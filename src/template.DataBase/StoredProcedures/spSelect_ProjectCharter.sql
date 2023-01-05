CREATE PROCEDURE [dbo].[spSelect_ProjectCharter]
    @Id int = NULL,
    @ProjectRequeriment varchar(255)= NULL,
    @Members varchar(255)= NULL,
    @Reach varchar(max)= NULL,
    @OutReach varchar(max)= NULL,
    @Goals varchar(max)= NULL,
    @Proposal varchar(255)= NULL,
    @IdProject int = NULL,
    @IsActive bit= NULL,
    @CreateDate datetime= NULL
AS
  SET NOCOUNT ON
   SELECT [IdDetailsProject]
         ,[ProjectRequeriment]
         ,[Members]
         ,[Reach]
         ,[OutReach]
         ,[Goals]
         ,[Proposal]
         ,[IdProject]
         ,[IsActive]
     FROM [dbo].[ProjectCharter]
      WHERE
	(@Id IS NULL OR  [IdDetailsProject] = @Id)
	AND (@ProjectRequeriment IS NULL OR [ProjectRequeriment] = @ProjectRequeriment)
    AND (@Members IS NULL OR [Members] = @Members)
    AND (@Reach IS NULL OR [Reach] = @Reach)
    AND (@OutReach IS NULL OR [OutReach] = @OutReach)
    AND (@Goals IS NULL OR [Goals] = @Goals)
    AND (@Proposal IS NULL OR [Proposal] = @Proposal)
    AND (@IdProject IS NULL OR [IdProject] = @IdProject)
    AND (@IsActive IS NULL OR [IsActive] = @IsActive)
    AND (@CreateDate IS NULL OR [CreateDate] = @CreateDate)
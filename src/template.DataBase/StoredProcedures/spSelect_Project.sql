CREATE PROCEDURE [dbo].[spSelect_Project]
	(   @Id int = null
      ,@ProjectName  varchar(255)= null
      ,@Description varchar(255)= null
      ,@IdProjectState int= null
      ,@IdLob int= null
      ,@IdUser int= null
      ,@IsActive bit= null
      ,@CreateDate datetime= null
      )
AS
SET NOCOUNT ON
	SELECT [IdProject]
      ,[ProjectName]
      ,[Description]
      ,[IdProjectState]
      ,[IdLob]
      ,[IdUser]
      ,[IsActive]
      ,[CreateDate]
  FROM [dbo].[Project]
  WHERE
	(@Id IS NULL OR  [IdProject] = @Id)
	AND (@ProjectName IS NULL OR [ProjectName] = @ProjectName)
    AND (@Description IS NULL OR [Description] = @Description)
    AND (@IdProjectState IS NULL OR [IdProjectState] = @IdProjectState)
    AND (@IdLob IS NULL OR [IdLob] = @IdLob)
    AND (@IdUser IS NULL OR [IdUser] = @IdUser)
    AND (@IsActive IS NULL OR [IsActive] = @IsActive)
    AND (@CreateDate IS NULL OR [CreateDate] = @CreateDate)
GO

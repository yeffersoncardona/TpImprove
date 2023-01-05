CREATE PROCEDURE [dbo].[spSelect_ProjectsByLob]
	@Id int= null,
	@IsActive bit= null
AS
SET NOCOUNT ON
	SELECT [IdProject]
      ,[ProjectName]
      ,[Description]
      ,[IdProjectState]
      ,P.[IdLob]
      ,[IdUser]
      ,[IsActive]
      ,[CreateDate]
  FROM [dbo].[Project] P
  INNER JOIN LOB L ON L.IdLOB = P.IdLob
  WHERE  P.[IdLob] = @Id
  AND    P.[IsActive] = @IsActive
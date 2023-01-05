CREATE PROCEDURE spSelect_CharterIdByProject
(  
    @Id int = NULL,
	@IsActive bit = NULL
 )   
AS
  SET NOCOUNT ON
	SELECT top 1 [IdDetailsProject]
      ,[ProjectRequeriment]
      ,[Members]
      ,[Reach]
      ,[OutReach]
      ,[Goals]
      ,[Proposal]
      ,[IdProject]
      ,[CreateDate]
      ,[IsActive]
      ,[ProblemStatus] 
     FROM [dbo].[ProjectCharter]
      WHERE (@Id IS NULL OR [IdProject] = @Id) AND
			(@IsActive IS NULL OR [IsActive] = @IsActive)
	  order by [IdDetailsProject] desc
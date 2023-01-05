CREATE PROCEDURE [dbo].[spSave_Project]
    @IdProject int,
   @ProjectName  varchar(255),
   @Description varchar(255),
   @IdProjectState int,
   @IdLob int,
   @IdUser int,
   @IdDataquery int=null
   --@Code int output,
   --@Message varchar(max) output
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
	INSERT INTO [dbo].[Project]
           ([ProjectName]
           ,[Description]
           ,[IdProjectState]
           ,[IdLob]
           ,[IdUser]
           ,[CreateDate]
		   ,IdDataquery)
     VALUES
           (@ProjectName
           ,@Description
           ,@IdProjectState
           ,@IdLob
           ,@IdUser
           ,GETDATE()
		   ,@IdDataquery);
		   DECLARE @ID INT =( SELECT @@IDENTITY AS 'Identity');
		SELECT
			IdProject,
			[ProjectName]
           ,[Description]
           ,[IdProjectState]
           ,[IdLob]
           ,[IdUser]
		   ,IsActive
           ,[CreateDate]
		   ,IdDataquery
		   FROM [dbo].[Project] WHERE IdProject = @ID
        

		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION

		--SET @Code = ERROR_NUMBER();
		--SET @Message = ERROR_MESSAGE();
	END CATCH
END

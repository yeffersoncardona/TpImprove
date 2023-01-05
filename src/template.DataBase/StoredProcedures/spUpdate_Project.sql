CREATE PROCEDURE [dbo].[spUpdate_Project]
		
	@IdProject int,
	@ProjectName varchar(255), 
	@Description varchar(255) ,
	@IdProjectState int,
	@IdLob int,
	@IdUser int,
	@IsActive bit,	
	@Code int output,
	@Message varchar(max) output
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
	UPDATE [dbo].[Project]
   SET 
      [ProjectName] = @ProjectName
      ,[Description] = @Description
      ,[IdProjectState] = @IdProjectState
      ,[IsActive] = @IsActive
    WHERE [IdProject] = @IdProject
	
	SET @Code = 0;
		SET @Message = 'Success';

		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION

		SET @Code = ERROR_NUMBER();
		SET @Message = ERROR_MESSAGE();
	END CATCH
END

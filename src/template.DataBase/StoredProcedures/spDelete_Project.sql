CREATE PROCEDURE [dbo].[spDelete_Project]
	@Id int,	
	@Code int output,
	@Message varchar(max) output
AS
	SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY

UPDATE [dbo].[Project]
   SET 
      [IsActive] = 0
    WHERE [IdProject] = @Id
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

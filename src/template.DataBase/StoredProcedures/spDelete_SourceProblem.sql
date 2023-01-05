CREATE PROCEDURE [dbo].[spDelete_SourceProblem]
	@Id int = null,
	@Code int output,
	@Message varchar(max) output
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
	UPDATE [dbo].SourceProblem
   SET [IsActive] = 0
 WHERE IDSproblem = @Id

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
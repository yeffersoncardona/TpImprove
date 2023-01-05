CREATE PROCEDURE [dbo].[spSave_Profile]
(
	@Name varchar(30) = NULL,
	@Permissions varchar(max) = NULL,
	@Code int output,
	@Message varchar(max) output
)
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
		INSERT INTO [Profile]
		(
			[Name],
			[Permissions],
			[Created]
		)
		VALUES
		(
			@Name,
			@Permissions,
			GETDATE()
		);

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

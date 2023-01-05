CREATE PROCEDURE [dbo].[spSave_User]
(
	@UserName varchar(30) = NULL,
	@FullName varchar(50) = NULL,
	@ProfileId int = NULL,
	@ClientId int = NULL,
	@Code int output,
	@Message varchar(max) output
)
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
		INSERT INTO [User]
		(
			[UserName],
			[FullName],
			[ProfileId],
			[ClientId],
			[Created]
		)
		VALUES
		(
			@UserName,
			@FullName,
			@ProfileId,
			@ClientId,
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

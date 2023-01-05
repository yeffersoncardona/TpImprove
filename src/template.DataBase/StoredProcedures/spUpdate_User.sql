CREATE PROCEDURE [dbo].[spUpdate_User]
(
	@Id int = NULL,
	@UserName varchar(30) = NULL,
	@FullName varchar(50) = NULL,
	@IsActive bit = TRUE,
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
		UPDATE [User]
			SET [UserName] = @UserName,
			[IsActive] = @IsActive,
			[FullName] = @FullName,
			[ProfileId] = @ProfileId,
			[ClientId] = @ClientId,
			[Created] = GETDATE()
		WHERE [Id] = @Id

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

CREATE PROCEDURE [dbo].[spUpdate_Profile]
(
	@Id int = NULL,
	@Name varchar(30) = NULL,
	@Permissions varchar(max) = NULL,
	@IsActive bit = NULL,
	@Code int output,
	@Message varchar(max) output
)
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
		UPDATE [Profile]
			SET [Name] = @Name,
			[IsActive] = @IsActive,
			[Created] = GETDATE(),
			[Permissions] = @Permissions
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

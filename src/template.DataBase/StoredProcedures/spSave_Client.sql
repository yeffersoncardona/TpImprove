CREATE PROCEDURE [dbo].[spSave_Client]
(   @Id int,
	@Name varchar(30) = NULL,
	@Code int output,
	@Market nchar(200) = NULL,
	@Message varchar(max) output
)
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
		INSERT INTO [Client]
		(	id,
			[Name],
			[Created],
			Market
		)
		VALUES
		(@Id,
			@Name,
			GETDATE(),
			@Market
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
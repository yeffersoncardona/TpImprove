CREATE PROCEDURE [dbo].[spSave_LOB]
	(@IdLOB int = 0,
	@LOBName varchar(255),
	@IdClient int,
	@Message varchar(max) output,
	@Code int output
	)
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
INSERT INTO [dbo].[LOB]
           ([IdLOB]
           ,[LOBName]
           ,[IdClient])
     VALUES
           (@IdLOB
           ,@LOBName
           ,@IdClient);
	--SELECT [IdLOB]
 --     ,[LOBName]
 --     ,[IdClient]
	--    FROM [Template].[dbo].[LOB]
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

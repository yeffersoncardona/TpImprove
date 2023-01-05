CREATE PROCEDURE [dbo].[spSave_SourceProblem](
	@IDSproblem int ,
	@ProblemDetail varchar(255),
	@IdProject int,
	@Result varchar(255),
	@CreateDate datetime,
	@IsActive bit,
	@Code int output,
    @Message varchar(max) output,
	@outputinsert int output
	)
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[SourceProblem]
           ([ProblemDetail]
           ,[IdProject]
           ,[Result]
		   ,[CreateDate]
		   ,[IsActive]
		   )
     VALUES
           (@ProblemDetail
           ,@IdProject
           ,@Result
		   ,@CreateDate
		   ,@IsActive
		   );
		SET  @outputinsert=  ( SELECT @@IDENTITY AS 'Identity');
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

Create PROCEDURE [dbo].[spUpdate_ProblemReasonsDetail]
(
    @IDProblemReasons int,
    @Why varchar(max),
    @IdSourceProblem int,
    @IdFather int=null,
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

     UPDATE [dbo].[ProblemReasonsDetail]
        SET [Why] = @Why
           ,[IsActive] = @IsActive
           ,[CreateDate] = @CreateDate
      WHERE [IDProblemReasons] =@IDProblemReasons
       
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
GO


CREATE PROCEDURE [dbo].[spUpdate_ProjectCharter]
	@IdDetailsProject int,
    @ProjectRequeriment varchar(255),
    @Members varchar(255),
    @Reach varchar(max),
    @OutReach varchar(max),
    @Goals varchar(max),
    @Proposal varchar(255),
    @IdProject int ,
    @IsActive bit,
    @CreateDate datetime,
    @Code int output,
	@Message varchar(max) output
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
	UPDATE [dbo].[ProjectCharter]
   SET [ProjectRequeriment] = @ProjectRequeriment
      ,[Members] = @Members
      ,[Reach] = @Reach
      ,[OutReach] = @OutReach
      ,[Goals] = @Goals
      ,[Proposal] = @Proposal
      ,[IdProject] =@IdProject
      ,[CreateDate] = GETDATE()
      ,[IsActive] = @IsActive
 WHERE [IdDetailsProject] = @IdDetailsProject

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
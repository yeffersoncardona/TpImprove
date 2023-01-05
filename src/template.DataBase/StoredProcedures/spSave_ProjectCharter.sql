CREATE PROCEDURE [dbo].[spSave_ProjectCharter]
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
    @Message varchar(max) output,
	@outputinsert int output
AS
SET NOCOUNT ON
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
	INSERT INTO [dbo].[ProjectCharter]
           ([ProjectRequeriment]
           ,[Members]
           ,[Reach]
           ,[OutReach]
           ,[Goals]
           ,[Proposal]
           ,[IdProject]
           ,[CreateDate]
           ,[IsActive])
     VALUES
           (@ProjectRequeriment
           ,@Members
           ,@Reach
           ,@OutReach
           ,@Goals
           ,@Proposal
           ,@IdProject
           ,GETDATE()
           ,@IsActive)
		set  @outputinsert=  ( SELECT @@IDENTITY AS 'Identity');
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

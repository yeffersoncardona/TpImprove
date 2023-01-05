CREATE PROCEDURE [dbo].[spDelete_Profile]
(
	@Id int
)

AS

SET NOCOUNT ON

DELETE FROM [Profile]
WHERE [Id] = @Id
GO

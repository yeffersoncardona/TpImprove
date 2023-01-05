CREATE PROCEDURE [dbo].[spDelete_User]
(
	@Id int
)

AS

SET NOCOUNT ON

DELETE FROM [User]
WHERE [Id] = @Id
GO

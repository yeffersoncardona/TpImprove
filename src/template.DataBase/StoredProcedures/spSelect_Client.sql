CREATE PROCEDURE [dbo].[spSelect_Client]
(
	@Id int = NULL,
	@Name varchar(30) = NULL,
	@IsActive bit = NULL,
	@Created date = NULL
)

AS
SET NOCOUNT ON
SELECT [Id],
	[Name],
	[IsActive],
	[Created]
FROM [Client] 
WHERE
	(@Id IS NULL OR  [Id] = @Id)
	AND (@Name IS NULL OR  [Name] = @Name)
	AND (@IsActive IS NULL OR  [IsActive] = @IsActive)
	AND (@Created IS NULL OR  [Created] = @Created)
CREATE PROCEDURE [dbo].[spSelect_Profile]
(
	@Id int = NULL,
	@Name varchar(30) = NULL,
	@IsActive bit = NULL,
	@Permissions varchar(max) = NULL,
	@Created date = NULL
)

AS
SET NOCOUNT ON

SELECT [Id],
	[Name],
	[IsActive],
	[Permissions],
	[Created]
FROM [Profile]
WHERE
	(@Id IS NULL OR  [Id] = @Id)
	AND (@Name IS NULL OR  [Name] = @Name)
	AND (@IsActive IS NULL OR  [IsActive] = @IsActive)
	AND (@Permissions IS NULL OR  [Permissions] = @Permissions)
	AND (@Created IS NULL OR  [Created] = @Created)
GO

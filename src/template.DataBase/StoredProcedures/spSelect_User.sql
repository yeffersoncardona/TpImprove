CREATE PROCEDURE [dbo].[spSelect_User]
(
	@Id int = NULL,
	@UserName varchar(30) = NULL,
	@FullName varchar(50) = NULL,
	@ProfileId int = NULL,
	@ClientId int = NULL,
	@IsActive bit = NULL,
	@Created date = NULL
)

AS
SET NOCOUNT ON

SELECT U.[Id],
	U.[UserName],
	U.[FullName],
	U.[ProfileId],
	P.[Name] AS ProfileName,
	P.[Permissions],
	U.[ClientId],
	C.[Name] AS ClientName,
	U.[IsActive],
	U.[Created]
FROM [User] U
LEFT JOIN [Profile] P ON U.[ProfileId] = P.Id
LEFT JOIN [Client] C ON U.[ClientId] = C.Id
WHERE
	(@Id IS NULL OR  U.[Id] = @Id)
	AND (@UserName IS NULL OR  [UserName] = @UserName)
	AND (@FullName IS NULL OR  [FullName] = @FullName)
	AND (@ProfileId IS NULL OR  [ProfileId] = @ProfileId)
	AND (@ClientId IS NULL OR  [ProfileId] = @ProfileId)
	AND (@IsActive IS NULL OR  U.[IsActive] = @IsActive)
	AND (@Created IS NULL OR  U.[ClientId] = @ClientId)
GO

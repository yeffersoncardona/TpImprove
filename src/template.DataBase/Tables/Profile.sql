CREATE TABLE [dbo].[Profile]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] VARCHAR(30) NOT NULL UNIQUE,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [Created] DATE NOT NULL, 
    [Permissions] VARCHAR(MAX)
)

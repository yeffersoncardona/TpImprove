CREATE TABLE [dbo].[Client]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] VARCHAR(30) NOT NULL UNIQUE, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [Created] DATE NOT NULL, 
    [Market] NCHAR(200) NOT NULL
)

CREATE TABLE [dbo].[Project]
(
	[IdProject] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ProjectName] VARCHAR(255) NOT NULL, 
    [Description] VARCHAR(255) NULL, 
    [IdProjectState] INT NOT NULL, 
    [IdLob] INT NOT NULL, 
    [IdUser] INT NOT NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [CreateDate] DATETIME NOT NULL, 
    [IdDataquery] INT NULL, 
    CONSTRAINT [FK_Project_Dataquery] FOREIGN KEY ([IdDataquery]) REFERENCES [Dataquerys]([Id]), 
    CONSTRAINT [FK_Project_LOB] FOREIGN KEY ([IdLob]) REFERENCES [LOB]([IdLOB])
)

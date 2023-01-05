CREATE TABLE [dbo].[ProjectCharter]
(
	[IdDetailsProject] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ProjectRequeriment] VARCHAR(255) NULL, 
    [Members] VARCHAR(255) NULL, 
    [Reach] VARCHAR(MAX) NULL, 
    [OutReach] VARCHAR(MAX) NULL, 
    [Goals] VARCHAR(MAX) NULL, 
    [Proposal] VARCHAR(255) NULL, 
    [IdProject] INT NOT NULL, 
    [CreateDate] DATETIME NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [ProblemStatus] VARCHAR(MAX) NULL, 
    CONSTRAINT [FK_ProjectCharter_Project] FOREIGN KEY ([IdProject]) REFERENCES [Project]([IdProject])
)

CREATE TABLE [dbo].[SourceProblem]
(
	[IDSproblem] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ProblemDetail] VARCHAR(255) NULL, 
    [IdProject] INT NOT NULL, 
    [Result] VARCHAR(255) NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [CreateDate] DATETIME NOT NULL
)

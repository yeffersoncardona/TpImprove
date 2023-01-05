CREATE TABLE [dbo].[ProblemReasonsDetail]
(
	[IDProblemReasons] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Why] VARCHAR(MAX) NULL, 
    [IdSourceProblem] INT NULL, 
    [IdFather] INT NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [CreateDate] DATETIME NOT NULL, 
    CONSTRAINT [FK_ProblemReasonsDetail_SourceProblem] FOREIGN KEY ([IdSourceProblem]) REFERENCES [SourceProblem]([IdSProblem]),
    CONSTRAINT [FK_ProblemReasonsDetail_IDFather] FOREIGN KEY ([IdFather]) REFERENCES [ProblemReasonsDetail]([IDProblemReasons])
)

CREATE TABLE IF NOT EXISTS chart (
    date TEXT,
    chart_data JSON
);

CREATE TABLE IF NOT EXISTS Players (
    player_id INTEGER PRIMARY KEY,
    name TEXT,
    cost INTEGER
);

CREATE TABLE IF NOT EXISTS team_players (
    user_id TEXT NOT NULL,
    player_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, player_id),
    FOREIGN KEY (player_id) REFERENCES Players (player_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS match_info (
    match_id INTEGER,
    match_date TEXT, -- ISO 8601 -- also could just join with match table
    team1 TEXT,
    team2 TEXT,
    PRIMARY KEY (match_id)
);

CREATE TABLE IF NOT EXISTS matches (
    player_id INTEGER NOT NULL,
    kills INTEGER,
    match_id INTEGER,
    PRIMARY KEY (match_id, player_id),
    FOREIGN KEY (player_id) REFERENCES Players (player_id) ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES match_info (match_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS allmatches (
    Tournament TEXT,
    Stage TEXT,
    Match_Type TEXT,
    Match_Name TEXT,
    Team_A TEXT,
    Team_B TEXT,
    Team_A_Score INTEGER,
    Team_B_Score INTEGER,
    Match_Result TEXT,
    PRIMARY KEY (Tournament, Stage, Match_Type, Team_A, Team_B)
);

-- Create table for logging how scores evolve over time
CREATE TABLE IF NOT EXISTS team_scores (
    user_id TEXT NOT NULL,
    player_id INTEGER NOT NULL,
    match_id INTEGER,
    match_date TEXT, -- ISO 8601 -- also could just join with match table
    PRIMARY KEY (user_id, match_id),
    FOREIGN KEY (player_id) REFERENCES Players (player_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY,
    username TEXT
);

CREATE TABLE IF NOT EXISTS Nodes (
    user_id TEXT PRIMARY KEY,
    nodes JSONB,
    edges JSONB
);

CREATE TABLE IF NOT EXISTS playerstats (
    Tournament TEXT,
    Stage TEXT,
    Match_Type TEXT,
    Player TEXT,
    Teams TEXT,
    Agents TEXT,
    Rounds_Played INTEGER,
    Rating REAL,
    Average_Combat_Score REAL,
    Kills_Deaths TEXT,
    KAST_Percent REAL,
    Average_Damage_Per_Round REAL,
    Kills_Per_Round REAL,
    Assists_Per_Round REAL,
    First_Kills_Per_Round REAL,
    First_Deaths_Per_Round REAL,
    Headshot_Percent REAL,
    Clutch_Success_Percent REAL,
    Clutches_Won_Played TEXT,
    Maximum_Kills_Single_Map INTEGER,
    Kills INTEGER,
    Deaths INTEGER,
    Assists INTEGER,
    First_Kills INTEGER,
    First_Deaths INTEGER,
    Match_ID INTEGER,
    date TEXT,
    PRIMARY KEY (Tournament, Stage, Match_Type, Teams, Player)
);

CREATE INDEX IF NOT EXISTS idx_playerstats_player ON playerstats(Player);

CREATE TABLE IF NOT EXISTS News (
    header TEXT,
    body TEXT,
    date TEXT
);
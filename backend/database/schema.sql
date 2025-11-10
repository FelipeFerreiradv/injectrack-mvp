-- Esquema de banco de dados do InjecTrack
-- PostgreSQL

-- Tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    sex VARCHAR(20) CHECK (sex IN ('male', 'female', 'other')),
    birthdate DATE,
    height INTEGER, -- cm
    weight DECIMAL(5,2), -- kg
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perfis
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    goal VARCHAR(50) CHECK (goal IN ('glute_growth', 'weight_loss', 'muscle_gain', 'endurance', 'general')),
    medications JSONB DEFAULT '[]'::jsonb,
    intake_targets JSONB DEFAULT '{"protein": 0, "fiber": 0, "water": 0}'::jsonb,
    level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de injeções
CREATE TABLE injections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    photo_url TEXT,
    detected BOOLEAN DEFAULT false,
    confidence DECIMAL(3,2), -- 0.00 a 1.00
    location VARCHAR(20) CHECK (location IN ('abdomen', 'arm', 'thigh', 'other')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_date UNIQUE (user_id, date)
);

-- Índice para buscas por data
CREATE INDEX idx_injections_date ON injections(date);
CREATE INDEX idx_injections_user_date ON injections(user_id, date);

-- Tabela de logs diários
CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    protein_g DECIMAL(6,2) DEFAULT 0,
    fiber_g DECIMAL(6,2) DEFAULT 0,
    water_ml INTEGER DEFAULT 0,
    side_effects JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_date_log UNIQUE (user_id, date)
);

-- Índice para buscas por data
CREATE INDEX idx_daily_logs_date ON daily_logs(date);
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, date);

-- Tabela de treinos
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week INTEGER NOT NULL,
    day INTEGER NOT NULL,
    exercise_list JSONB NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_week_day UNIQUE (user_id, week, day)
);

-- Índice para buscas por semana
CREATE INDEX idx_workouts_week ON workouts(week);
CREATE INDEX idx_workouts_user_week ON workouts(user_id, week);

-- Tabela de assinaturas
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(20) CHECK (provider IN ('stripe', 'mercadopago')),
    provider_id VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'canceled', 'expired', 'trial')),
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    trial_ends_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para buscas por status
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


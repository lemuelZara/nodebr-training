DROP TABLE IF EXISTS tb_heroes;

CREATE TABLE tb_heroes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    nome TEXT NOT NULL,
    poder TEXT NOT NULL
);

INSERT INTO tb_heroes (nome, poder) 
VALUES
('Flash', 'Velocidade'),
('Batman', 'Dinheiro'),
('Superman', 'Força');

SELECT * FROM tb_heroes;

UPDATE tb_heroes 
SET nome='Goku', poder='Super força'
WHERE id=3;

DELETE FROM tb_heroes
WHERE id=2;
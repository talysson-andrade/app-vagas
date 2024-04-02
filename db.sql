


CREATE TABLE user (
    cpf VARCHAR(14) PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    is_admin BOOLEAN
);


CREATE TABLE vaga (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cargo VARCHAR(100),
    tipo VARCHAR(100),
    descricao TEXT
);

CREATE TABLE inscricao (
    vaga_id INT,
    user_cpf VARCHAR(14),
    data TIMESTAMP,
    FOREIGN KEY (vaga_id) REFERENCES vaga(id),
    FOREIGN KEY (user_cpf) REFERENCES user(cpf),
    PRIMARY KEY (vaga_id, user_cpf)
);
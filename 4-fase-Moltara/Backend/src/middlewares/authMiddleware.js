import jwt from "jsonwebtoken";
// Use a mesma chave secreta usada no controller
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;


export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};



export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "O email já está registrado." });
    }

    // 2. Cria o Hash da Senha
    // NUNCA salve a senha em texto puro (plaintext) no banco de dados!
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Cria e salva o novo usuário no MongoDB
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Salva o hash, não o texto puro
      // Qualquer outro campo padrão (ex: role: 'user')
    });
    const user = await newUser.save();

    // 4. Opcional: Gera e retorna o Token JWT diretamente após o registro
    // Isso evita que o usuário precise fazer login imediatamente após o cadastro
    const JWT_SECRET = "sua_chave_secreta_MUITO_FORTE"; // Use a mesma chave!
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      userId: user._id,
      message: "Registro bem-sucedido. Login automático efetuado.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao registrar usuário." });
  }
};

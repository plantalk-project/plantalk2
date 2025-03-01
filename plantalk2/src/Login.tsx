import React from 'react'

function Login() {
  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="input-group">
          <label>あなたの名前を教えてね</label>
          <div className="input-with-icon">
            <input type="text" />
            <span className="pencil-icon">✎</span>
          </div>
        </div>
        
        <div className="input-group">
          <label>パスワードを打ってね</label>
          <div className="input-with-icon">
            <input type="password" />
            <span className="pencil-icon">✎</span>
          </div>
        </div>

        <button className="ok-button">OK</button>
      </div>

      <div className="register-container">
        <p>新しくきた人はこっちで登録してね</p>
        <button className="next-button">次へ</button>
      </div>
    </div>
  )
}

export default Login 
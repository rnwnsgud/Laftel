import React, { useEffect } from "react";

function LoginNextPage() {
  return (
    <div className="cznWsF">
      <div className="form_loginNext">
        <a href="/">
          <h1>LAFTEL</h1>
        </a>
        <p>신작부터 역대 인기 작품까지</p>
        <p>애니메이션을 한 곳에서 편-안하게 즐기세요!</p>
        <a href="/login">이메일로 로그인</a>
        <div>
          <a href="/register">이메일로 가입</a>
          <a href="#">다른 방법으로 계속</a>
        </div>
      </div>
    </div>
  );
}

export default LoginNextPage;

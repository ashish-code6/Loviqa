"use client";

export default function AuthActionButton({
  mode = "login",
  children,
  className = "",
  onOpen,
  ...props
}) {
  function handleClick() {
    onOpen?.();
    window.dispatchEvent(
      new CustomEvent("loviqa:auth", {
        detail: { mode },
      }),
    );
  }

  return (
    <button type="button" onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}

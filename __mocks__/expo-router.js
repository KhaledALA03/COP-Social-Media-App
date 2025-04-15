export function useRouter() {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  };
}

export function useLocalSearchParams() {
  return {};
}

export function Stack() {
  return null;
}

export function Tabs() {
  return null;
}

export default {};

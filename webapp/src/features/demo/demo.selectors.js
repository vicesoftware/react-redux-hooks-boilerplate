export const getAllDemo = (state) => state.demo.allDemo
export const getDemoById = (demoId) => (state) =>
	state.demo.allDemo.find((item) => item.id === demoId)

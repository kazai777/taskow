package tasks

import (
	"std"
	"strconv"
	"strings"
)

type Task struct {
	Owner       std.Address
	Title       string
	Description string
	Amount      int64
}

var tasks []Task

func CreateTask(title, description string, amount int64) {
	sentCoins := std.GetOrigSend()
	receivedAmount := sentCoins.AmountOf("ugnot")

	if amount != receivedAmount {
		panic("The amount sent must correspond to the specified amount")
	}

	caller := std.GetOrigCaller()

	task := Task{
		Title:       title,
		Description: description,
		Amount:      amount,
		Owner:       caller,
	}

	tasks = append(tasks, task)
}

func escapeString(str string) string {
	return strings.ReplaceAll(str, `"`, `\"`)
}

func taskToJSONString(task Task) string {
	return `{"owner":"` + task.Owner.String() + `","title":"` + escapeString(task.Title) + `","description":"` + escapeString(task.Description) + `","amount":` + strconv.FormatInt(task.Amount, 10) + `}`
}

func GetTasks() string {
	var sb strings.Builder
	sb.WriteString("[")
	for i, task := range tasks {
		if i > 0 {
			sb.WriteString(",")
		}
		sb.WriteString(taskToJSONString(task))
	}
	sb.WriteString("]")
	return sb.String()
}

func Render(path string) string {
	return GetTasks()
}
